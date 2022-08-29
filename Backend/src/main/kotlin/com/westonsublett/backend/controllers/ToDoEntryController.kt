package com.westonsublett.backend.controllers

import com.westonsublett.backend.repository.ToDoEntryRepository
import com.westonsublett.backend.repository.UserTokensRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/entry")
class ToDoEntryController {

    @Autowired
    lateinit var toDoEntryRepository: ToDoEntryRepository

    @Autowired
    lateinit var userTokensRepository: UserTokensRepository

    @GetMapping
    fun getAllEntries(@RequestBody body: String): ResponseEntity<*> {
        val user = userTokensRepository.findByValue(body)?.user
        val entryList = toDoEntryRepository.findAllByUserId(user?.id!!)

        return ResponseEntity(entryList, HttpStatus.OK)
    }

    @GetMapping("{entry_id}")
    fun getEntriesByID(@RequestBody body: String, @PathVariable("entry_id") entry_id: Int): ResponseEntity<*> {
        val user = userTokensRepository.findByValue(body)?.user
        val entry = toDoEntryRepository.findByUserIdAndId(user?.id!!, entry_id)

        return ResponseEntity(entry, HttpStatus.OK)
    }
}