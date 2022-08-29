package com.westonsublett.backend.config

import com.google.gson.GsonBuilder
import com.westonsublett.backend.BackendApplication
import java.io.File
import java.io.FileWriter
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption

class Config {

    companion object {
        private val logger = BackendApplication.logger
        private var data: ConfigData = ConfigData("", 0, "", "", "", true)
        private val path = File("").absolutePath.replace("Backend", "") + "/config.json"

        private fun createFirstTime() {
            logger.info(
                "\n\n\nThe application has detected that this is the first time running the application.\n" +
                        "New files will be created at this time, stopping application so config can be edited.\n\n\n"
            )

            val config = copyFile() ?: return

            //Change the value of isFirstTime from true to false in the config.
            try {
                val gson = GsonBuilder().setPrettyPrinting().create()
                loadConfig()
                data.isFirstBoot = false
                val fw = FileWriter(config.path)
                gson.toJson(data, fw)

                fw.flush()
                fw.close()
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }

        private fun copyFile(): File? {
            try {
                val url = BackendApplication.Companion::class.java.classLoader.getResource("config.json")
                if (url == null) {
                    logger.error("File: config.json could not be found please delete all files and retry.")
                    return null
                }
                val file = File(url.toURI())
                val output = Files.copy(file.toPath(), Path.of(path), StandardCopyOption.REPLACE_EXISTING).toFile()
                if (!output.exists()) logger.error("File: config.json was unsuccessfully copied. Please delete all files and retry.")
                return output
            } catch (e: Exception) {
                logger.error("File: config.json was unsuccessfully copied. Please delete all files and retry.")
                e.printStackTrace()
                return null
            }
        }

        private fun loadConfig(): Boolean {
            val gson = GsonBuilder().setPrettyPrinting().create()
            try {
                data = gson.fromJson(Files.newBufferedReader(Path.of(path)), ConfigData::class.java)
            } catch (e: Exception) {
                return false
            }
            return true
        }

        fun getData(): ConfigData {
            if (data.host.contentEquals("")) if (!loadConfig()) createFirstTime()
            return data
        }
    }

    data class ConfigData(
        val host: String,
        val port: Int,
        val username: String,
        val password: String,
        val database: String,
        var isFirstBoot: Boolean
    )
}