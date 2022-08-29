package com.westonsublett.backend.data

import java.sql.Date
import javax.persistence.*

@Entity
@Table(name = "to_do_entry")
class ToDoEntry() {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "entry_id", nullable = false)
    var id: Int? = null

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    var user: Users? = null

    @Column(name = "entry_name")
    var entryName: String? = null

    @Column(name = "entry")
    var entry: String? = null

    @Column(name = "due_date")
    var dueDate: Date? = null

    @Column(name = "is_complete")
    var isComplete: Boolean? = null

    constructor(user: Users, entryName: String, entry: String, dueDate: Date, isComplete: Boolean) : this() {
        this.user = user
        this.entryName = entryName
        this.entry = entry
        this.dueDate = dueDate
        this.isComplete = isComplete
    }
}