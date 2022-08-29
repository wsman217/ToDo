package com.westonsublett.backend.repository

import com.westonsublett.backend.data.ToDoEntry
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ToDoEntryRepository : CrudRepository<ToDoEntry, Int> {

    fun findAllByUserId(userId: Int): List<ToDoEntry>

    fun findByUserIdAndId(userId: Int, id: Int): ToDoEntry
}