import React from 'react'
import "./Login.css"

export default function Login() {
  return (
    <>
    
    <div className="align">
      <div className="grid">
        <form className="form login">
          <div className="form__field">
            <label htmlFor="login__username">
              <svg className="icon">
                <use xlinkHref="#icon-user"></use>
              </svg>
              <span className="hidden">Username</span>
            </label>
            <input
              autoComplete="username"
              id="login__username"
              type="text"
              name="username"
              className="form__input"
              placeholder="Username"
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="login__password">
              <svg className="icon">
                <use xlinkHref="#icon-lock"></use>
              </svg>
              <span className="hidden">Password</span>
            </label>
            <input
              id="login__password"
              type="password"
              name="password"
              className="form__input"
              placeholder="Password"
              required
            />
          </div>

          <div className="form__field">
            <input type="submit" value="Sign In" />
          </div>
        </form>

        <p className="text--center">
          Not a member? <a href="#">Sign up now</a>
          <svg className="icon">
            <use xlinkHref="#icon-arrow-right"></use>
          </svg>
        </p>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" className="icons">
        {/* The symbol definitions remain unchanged */}
      </svg>
    </div>
    
    </>
  )
}
