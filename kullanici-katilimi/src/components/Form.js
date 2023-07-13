import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import "./Form.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("İsim zorunludur")
    .min(3, "İsim en az 3 karakter olmalıdır"),
  email: Yup.string()
    .required("Posta adresi lazım")
    .email("@ işareti gereklidir."),
  pass: Yup.string()
    .required("Şifre lazım")
    .min(6, "Min 6 karakter")
    .matches(/[^0-9]/, "Şifre sadece sayı olamaz harf falan ekle"),
  terms: Yup.boolean().oneOf(
    [true],
    "İşaretlemek Zorunlu"
  ),
});

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fValue,
    }));

    validationSchema
      .validateAt(name, { [name]: fValue })
      .then(() => {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
      })
      .catch((err) => {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message }));
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const response = await axios.post(
        "https://reqres.in/api/users",
        formData
      );
      console.log("form gönderildi", response.data);
    } catch (err) {
      console.log("formda hatalar var", err);
    }
  };

  const isDisabled = Object.keys(errors).some((key) => !!errors[key]);

  return (
    <>
      <form className="Form" onSubmit={handleSubmit}>
        <div>
          <label name="İsim" htmlFor="name">İsim ve Soyisim</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={formData.name}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Eposta</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="pass">Şifre</label>
          <input
            onChange={handleChange}
            type="password"
            name="pass"
            value={formData.pass}
          />
          {errors.pass && <p>{errors.pass}</p>}
        </div>
        <div>
          <label htmlFor="terms">Kullanım Şartları</label>
          <input id="checkbox"
            onChange={handleChange}
            type="checkbox"
            name="terms"
            checked={formData.terms}
          />
          {errors.terms && <p>{errors.terms}</p>}
        </div>
        <button className="button" type="submit" disabled={isDisabled}>
          Gönder
        </button>
      </form>
    </>
  );
};

export default Form;
