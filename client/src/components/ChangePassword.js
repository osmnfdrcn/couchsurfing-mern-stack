import { useState } from "react";
import { FormRow } from ".";
import { useAppContext } from "../context/appContext";


const ChangePassword = ({ setShowGeneralInfo, setShowHostingInfo, setShowAvatar, setShowPassword }) => {
  const { updatePassword } = useAppContext();

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // rule input must turn empty after submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword({ password, confirmPassword })

    setTimeout(() => {
      setShowGeneralInfo(false)
      setShowHostingInfo(false)
      setShowAvatar(false)
      setShowPassword(false)
    }, 2000)

  };

  // Form Input Properties
  const changePasswordData = [
    {
      id: 1,
      type: "password",
      name: "password",
      value: password,
      labelText: "new password",
      handleChange: (e) => setPassword(e.target.value),
    },
    {
      id: 2,
      type: "password",
      name: "confirmPassword",
      value: confirmPassword,
      labelText: "confirm password",
      handleChange: (e) => setConfirmPassword(e.target.value),
    },
  ];

  return (
    <div>
      <form className="update-form" onSubmit={handleSubmit}>
        {changePasswordData.map((input, id) => {
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

        <button type="submit" className="update-btn" >Update</button>
      </form >
    </div >
  );
};

export default ChangePassword;
