export default function Contact() {
  return (
    <>
      <div className="container text-white mt-5 vh90">
        <h1>Contact MasterBetter</h1>

        <div className="row mt-5">
          <ul>
            <li>Business inquiries: {"hello (at) masterbetter.pro"}</li>
          </ul>
        </div>
        <div className="row mt-2">
          <ul>
            <li>
              Community Discord:{"        "}
              <a href="https://discord.com/invite/Hju8vsD8QA">
                <img
                  src={"/discord_icon.png"}
                  alt="Discord Icon"
                  width="38"
                  height="30"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
