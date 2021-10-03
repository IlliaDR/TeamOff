﻿using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ToDoList
{
    public partial class Tasks
    {
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public int? UserId { get; set; }
        public int ColumnId { get; set; }

        public virtual Columns Column { get; set; }
    }
}
