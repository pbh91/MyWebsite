using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Infrastructure;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/Login")]
    public class LoginController : ApiController
    {
        [HttpGet]
        public IHttpActionResult ExternalLogin()
        {
            // return new ChallengeResult("Google","/api/Profiles", this.Request);
            return new ChallengeResult("Facebook", "/api/Profiles", this.Request);
        }
    }
}
