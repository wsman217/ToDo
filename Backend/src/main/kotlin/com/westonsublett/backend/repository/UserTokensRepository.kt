package com.westonsublett.backend.repository

import com.westonsublett.backend.data.UserTokens
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserTokensRepository : CrudRepository<UserTokens, Int> {

    fun findByValue(value: String): UserTokens?
}