using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.Google;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI
{
    public class SecurityConfig
    {
        public static void Configure(IAppBuilder app)
        {
            // Enable the application to use a cookie to store information for the signed in user
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ExternalCookie
            });

            // Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Configure google authentication
            var options_Google = new GoogleOAuth2AuthenticationOptions()
            {
                ClientId = "633395689531-354k9fvmkb4075i0pfd1fktrtuq8e7r1.apps.googleusercontent.com",
                ClientSecret = "8465UxcPhP4-lqS9Z8rnCpSR"
            };

            app.UseGoogleAuthentication(options_Google);
            
            var options_Facebook = new FacebookAuthenticationOptions()
            {
                AppId = "293892227738832",
                AppSecret = "9d01480cc4fc40571cb36ac4c6e95cbc"
            };

            app.UseFacebookAuthentication(options_Facebook);
        }
    }
}