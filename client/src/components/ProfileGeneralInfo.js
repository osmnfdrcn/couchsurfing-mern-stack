import { useState } from "react";
import { FormRow } from ".";
import { useAppContext } from "../context/appContext";

const ProfileGeneralInfo = ({ setShowGeneralInfo, setShowHostingInfo, setShowAvatar }) => {
  const { user, updateProfile, displayAlert } = useAppContext();

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [age, setAge] = useState(user?.age)
  const [country, setCountry] = useState(user?.country)
  const [city, setCity] = useState(user?.city)
  const [countryVisited, setCountryVisited] = useState()
  const [countriesVisited, setCountriesVisited] = useState(user.countriesVisited);

  const handleSubmit = (e) => {

    e.preventDefault();
    if (!name || !email) {
      displayAlert()
      return
    }
    updateProfile({ name, email, age, country, city, countriesVisited });
    setTimeout(() => {
      setShowGeneralInfo(false)
      setShowHostingInfo(false)
      setShowAvatar(false)
    }, 1000)
  };


  // add remove countries to/from countriesVisited
  const addCountry = () => {
    if (!countryVisited) { return }
    const countries = [...countriesVisited, countryVisited].map((c) =>
      c.toLowerCase()
    );
    const uniqueCountries = [...new Set(countries)];
    setCountriesVisited(uniqueCountries);
    setCountryVisited('')
  };

  const removeCountry = (c) => {
    setCountriesVisited(countriesVisited.filter((country) => country !== c));
  };

  // Form Input Properties
  const profileFormGeneralData = [
    {
      id: 1,
      type: "text",
      name: "name",
      value: name,
      labelText: "name",
      handleChange: (e) => setName(e.target.value),
    },
    {
      id: 2,
      type: "text",
      name: "email",
      value: email,
      labelText: "email",
      handleChange: (e) => setEmail(e.target.value)
    },
    {
      id: 3,
      type: "text",
      name: "age",
      value: age,
      labelText: "age",
      handleChange: (e) => setAge(e.target.value)
    },
    {
      id: 4,
      type: "text",
      name: "country",
      value: country,
      labelText: "country",
      handleChange: (e) => setCountry(e.target.value)
    },
    {
      id: 5,
      type: "text",
      name: "city",
      value: city,
      labelText: "city",
      handleChange: (e) => setCity(e.target.value)
    },
  ];

  return (
    <div>
      <form className="update-form" onSubmit={handleSubmit}>
        {profileFormGeneralData.map((input, id) => {
          return (
            <FormRow
              key={id}
              type={input.type}
              name={input.name}
              value={input.value}
              labelText={input.labelText}
              handleChange={input.handleChange}
            />
          );
        })}

        <div className="countries">
          <div>
            <FormRow
              type="text"
              name="city"
              labelText="visited"
              value={countryVisited}
              handleChange={(e) => setCountryVisited(e.target.value)}
            />
            <span onClick={addCountry} className="item-add">
              +
            </span>
          </div>

          {countriesVisited.map((country, id) => {
            return (
              <span
                key={id}
                className="visited"
                onClick={() => removeCountry(country)}
              >
                <span>x</span>
                {country}
              </span>
            );
          })}
          <button type="submit" className="update-btn">Update</button>
        </div>
      </form>
    </div >

  );
};

export default ProfileGeneralInfo;
