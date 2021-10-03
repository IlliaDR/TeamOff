using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ToDo
{
    public partial class Status
    {
        public Status()
        {
            Tasks = new HashSet<Tasks>();
        }

        public int StatusId { get; set; }
        public string StatusName { get; set; }

        public virtual ICollection<Tasks> Tasks { get; set; }
    }
}
