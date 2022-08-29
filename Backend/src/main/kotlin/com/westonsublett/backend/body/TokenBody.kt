package com.westonsublett.backend.body

//I do not know why but Jackson will not parse JSON if it only has a single piece of data so had to throw in a discard
//variable until I find another way around this.
data class TokenBody(val userToken: String, val discard: String)