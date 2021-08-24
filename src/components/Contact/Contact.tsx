function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <div className='infoSection'>
        <div className='openingHours'>
          <h2>Hours</h2>
          <div>
            <p>Mon-Fri</p>
            <p>12-00</p>
          </div>
          <div>
            <p>Sat-Sun</p>
            <p>09-00</p>
          </div>
        </div>
        <div className='loaction'>
          <h2>Where to find us </h2>
          <div>
            <address>
              <a className='adress' href=''>
                Åsögatan 175
              </a>
            </address>
            <a className='email' href='mailto:latenightbrunch@contact.com'>
              latenightbrunch@contact.com
            </a>
            <a className='phoneNumber' href='tel:08-1234567'>
              08-123 45 67
            </a>
          </div>
        </div>
      </div>
      <div className='mapSection'>Google maps location here</div>
    </div>
  );
}

export default Contact;
