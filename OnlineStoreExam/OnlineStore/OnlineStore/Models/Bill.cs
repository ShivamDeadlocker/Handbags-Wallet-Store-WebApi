using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineStore.Models
{
    /// <summary>
    /// This Class Having the Properties Related To Bill Tables
    /// </summary>
    public class Bill
    {
        public int BillID { get; set; }

        public int UserID { get; set; }

        public UserDetails User { get; set; }
    }
}