package com.westonsublett.backend.config

import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import javax.sql.DataSource

@Configuration
class MariaDB {

    private val config = Config.getData()

    @Bean
    fun dataSource(): DataSource {
        val dataSourceBuilder = DataSourceBuilder.create()
        dataSourceBuilder.driverClassName("org.mariadb.jdbc.Driver")
            .url("jdbc:mariadb://" + config.host + ":" + config.port + "/" + config.database).username(config.username)
            .password(config.password)
        return dataSourceBuilder.build()
    }
}