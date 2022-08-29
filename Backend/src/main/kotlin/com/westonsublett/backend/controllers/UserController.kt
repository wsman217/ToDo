package com.westonsublett.backend.controllers

import at.favre.lib.crypto.bcrypt.BCrypt
import com.westonsublett.backend.body.UserCreateBody
import com.westonsublett.backend.body.UserLoginBody
import com.westonsublett.backend.data.UserTokens
import com.westonsublett.backend.data.Users
import com.westonsublett.backend.repository.UserRepository
import com.westonsublett.backend.repository.UserTokensRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.sql.Date

@RestController
@RequestMapping("api/user")
class UserController {

    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var userTokenRepository: UserTokensRepository

    @GetMapping("{user_id}")
    fun getUserById(@PathVariable(name = "user_id") user_id: Int): ResponseEntity<*> {
        val user: Users =
            userRepository.findByIdOrNull(user_id) ?: return ResponseEntity("Invalid User", HttpStatus.NOT_FOUND)

        val map = HashMap<String, Any?>()
        map["id"] = user.id
        map["name"] = user.name
        map["username"] = user.username
        return ResponseEntity(map, HttpStatus.FOUND)
    }

    @PostMapping("create")
    fun createUser(@RequestBody userBody: UserCreateBody): ResponseEntity<*> {
        println("Username: " + userBody.username + " Name: " + userBody.name + " Password: " + userBody.password)
        if (userRepository.findByUsername(userBody.username) != null) return ResponseEntity(
            "User exists.", HttpStatus.CONFLICT
        )

        val bcryptHashString = BCrypt.withDefaults().hashToString(12, userBody.password.toCharArray())

        userRepository.save(Users(userBody.name, userBody.username, bcryptHashString))
        return ResponseEntity("User created.", HttpStatus.CREATED)
    }

    @CrossOrigin(origins = ["http://localhost:19006"])
    @PostMapping("login")
    fun loginUser(@RequestBody userBody: UserLoginBody): ResponseEntity<*> {
        println("User is trying to log in.")
        println("Username: " + userBody.username + " Password: " + userBody.password)
        val user: Users = userRepository.findByUsername(userBody.username) ?: return ResponseEntity(
            "User does not exists.", HttpStatus.NOT_FOUND
        )

        val result = BCrypt.verifyer()
            .verify(userBody.password.toCharArray(), userRepository.findByUsername(userBody.username)!!.password);

        return if (result.verified) {
            println("Verified.")
            val token = UserTokens(user, Date.valueOf(Date(System.currentTimeMillis()).toLocalDate().plusMonths(1)))

            userTokenRepository.save(token)

            ResponseEntity(token.value?.replace("$", "\$") ?: "", HttpStatus.OK)
        } else ResponseEntity("Incorrect Password.", HttpStatus.UNAUTHORIZED)
    }
}