using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ToDoList
{
    public partial class Columns
    {
        public Columns()
        {
            Tasks = new HashSet<Tasks>();
        }

        public int ColumnId { get; set; }
        public string ColumnName { get; set; }
        public int BoardId { get; set; }

        public virtual Boards Board { get; set; }
        public virtual ICollection<Tasks> Tasks { get; set; }
    }
}
