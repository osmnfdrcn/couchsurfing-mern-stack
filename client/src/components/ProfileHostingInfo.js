import { useState } from "react";
import { FormRow } from ".";
import { useAppContext } from "../context/appContext";


const ProfileHostingInfo = ({ setShowGeneralInfo, setShowHostingInfo, setShowAvatar }) => {
  const { user, updateProfile } = useAppContext();
  const [prefAgeStart, setPrefAgeStart] = useState(user?.hosting?.prefAgeStart)
  const [prefAgeEnd, setPrefAgeEnd] = useState(user?.hosting?.prefAgeEnd)
  const [maxNights, setsetMaxNights] = useState(user?.hosting?.maxNights)
  const [rule, setRule] = useState();
  const [rules, setRules] = useState(user?.rules);

  // rule input must turn empty after submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      hosting: {
        prefAgeStart,
        prefAgeEnd,
        maxNights
      },
      rules
    })
    setShowGeneralInfo(false)
    setShowHostingInfo(false)
    setShowAvatar(false)
  };

  const addRule = () => {
    if (!rule) { return }
    //find a better variable name
    const tempRules = [...rules, rule].map((r) =>
      r.toLowerCase()
    );
    const uniqueRules = [...new Set(tempRules)];
    setRules(uniqueRules);
    setRule('')
  };

  const removeRule = (r) => {
    setRules(rules.filter((rule) => rule !== r));
  };


  // Form Input Properties
  const profileFormHostingData = [
    {
      id: 1,
      type: "text",
      name: "prefAgeStart",
      value: prefAgeStart,
      labelText: "preferred min age",
      handleChange: (e) => setPrefAgeStart(e.target.value),
    },
    {
      id: 2,
      type: "text",
      name: "prefAgeEnd",
      value: prefAgeEnd,
      labelText: "preferred max age ",
      handleChange: (e) => setPrefAgeEnd(e.target.value),
    },
    {
      id: 3,
      type: "text",
      name: "maxNights",
      value: maxNights,
      labelText: "max nights",
      handleChange: (e) => setsetMaxNights(e.target.value),
    },
  ];

  return (
    <div>
      <form className="update-form" onSubmit={handleSubmit}>
        {profileFormHostingData.map((input, id) => {
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
              name="rules"
              labelText="rules"
              value={rule}
              handleChange={(e) => setRule(e.target.value)}
            />
            <span onClick={addRule} className="item-add">
              +
            </span>
          </div>

          {rules.map((rule, id) => {
            return (
              <span
                key={id}
                className="visited"
                onClick={() => removeRule(rule)}
              >
                <span>x</span>
                {rule}
              </span>
            );
          })}
        </div>
        <button type="submit" className="update-btn">Update</button>
      </form >
    </div >
  );
};

export default ProfileHostingInfo;
