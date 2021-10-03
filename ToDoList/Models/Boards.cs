using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ToDoList
{
    public partial class Boards
    {
        public Boards()
        {
            Columns = new HashSet<Columns>();
        }

        public int BoardId { get; set; }
        public string BoardName { get; set; }

        public virtual ICollection<Columns> Columns { get; set; }
    }
}
