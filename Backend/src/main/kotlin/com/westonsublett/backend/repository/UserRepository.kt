package com.westonsublett.backend.repository

import com.westonsublett.backend.data.Users
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : CrudRepository<Users, Int> {

    fun findByUsername(username: String): Users?
}