using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ToDoList
{
    public partial class UsersBoards
    {
        public int UserId { get; set; }
        public int BoardId { get; set; }

        public virtual Boards Board { get; set; }
        public virtual Users User { get; set; }
    }
}
