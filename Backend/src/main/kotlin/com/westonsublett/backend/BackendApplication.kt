package com.westonsublett.backend

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BackendApplication {
    companion object {
        val logger: Logger = LoggerFactory.getLogger(Companion::class.java)
    }
}

fun main(args: Array<String>) {
    runApplication<BackendApplication>(*args)
}
