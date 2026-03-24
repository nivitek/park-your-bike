import "./Detail.css";
export default function Detail() {
  return (
    <>
      <h3 className="tracking-tight text-balance text-gray-900 sm:text-5xl text-center">
        How does it work?
      </h3>
      <div className="container">
        <ol
          type="1"
          className="mt-8 text-pretty text-gray-500 sm:text-xl/8 lg:px-12"
        >
          <li>
            1. Register yourself here -&gt;{" "}
            <a href="/Register" className="cursor-pointer link">
              Sign Up
            </a>
            <img
              src="/assets/images/register.png"
              alt="register"
              className="imgcenter"
            />
          </li>
          <br />
          <li>
            2. Already an registered user? -&gt;{" "}
            <a href="/Login" className="cursor-pointer link">
              Login
            </a>
            <img
              src="/assets/images/login.png"
              alt="login"
              className="imgcenter"
            />
          </li>
          <br />
          <li>
            3. Once logged in, book your slot
            <img
              src="/assets/images/home.png"
              alt="home"
              className="imgcenter"
            />
          </li>
          <br />
          <li>
            4. Auto filled details &gt; Choose Dates &gt; Book Slot <br />
            <img
              src="/assets/images/booking.png"
              alt="booking"
              className="imgcenter"
            />
            <br />
            <b>Note:</b> One slot can be booked per user for a day
          </li>
          <br />
          <li>
            5. If in case of updating your details, Go to your profile and
            update the details
            <img
              src="/assets/images/profile.png"
              alt="profile"
              className="imgcenter"
            />
          </li>
          <br />
          <li>
            6. Update your profile &gt; Save your changes
            <img
              src="/assets/images/update-profile.png"
              alt="update-profile"
              className="imgcenter"
            />
          </li>
          <br />
          <li>
            7. To update your password
            <img
              src="/assets/images/forgot-password.png"
              alt="forgot-password"
              className="imgcenter"
            />
          </li>
          <br />
        </ol>
      </div>
    </>
  );
}
