using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineStore.Models
{
    /// <summary>
    /// This Class Having the Properties Related To UserDetails Tables
    /// </summary>
    public class UserDetails
    {
        public int UserID { get; set; }

        public string UserName { get; set; }

        public string UserEmail { get; set; }

        public string UserPassword { get; set; }

        public string UserConfirmPassword { get; set; }

        public int TypeId { get; set; }

        // Navigation Property (Optional)
        public UserType UserType { get; set; }
    }
}