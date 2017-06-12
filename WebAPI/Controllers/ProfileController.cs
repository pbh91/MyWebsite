using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/Profiles")]
    public class ProfileController : ApiController
    {

        [Authorize]
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(Profile.CreateOrders());
        }

        #region Helpers

        public class Profile
        {
            public int ProfileID { get; set; }
            public string ProfileName { get; set; }
            public string ProfileCity { get; set; }
            public Boolean IsHidden { get; set; }

            public static List<Profile> CreateOrders()
            {
                List<Profile> ProfileList = new List<Profile>
            {
                new Profile {ProfileID = 10248, ProfileName = "Taiseer Joudeh", ProfileCity = "Amman", IsHidden = true },
                new Profile {ProfileID = 10249, ProfileName = "Ahmad Hasan", ProfileCity = "Dubai", IsHidden = false},
                new Profile {ProfileID = 10250,ProfileName = "Tamer Yaser", ProfileCity = "Jeddah", IsHidden = false },
                new Profile {ProfileID = 10251,ProfileName = "Lina Majed", ProfileCity = "Abu Dhabi", IsHidden = false},
                new Profile {ProfileID = 10252,ProfileName = "Yasmeen Rami", ProfileCity = "Kuwait", IsHidden = true}
            };

                return ProfileList;
            }
        }

        #endregion
    }
}
