const REGEX_VALIDATION = {
  name: /^[A-ZА-ЯЁ][a-zA-Zа-яё\s\-]*$/,
  email: /^[\w\.]+@[a-zA-Z]{3,}\.[a-zA-Z]{2,5}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]{8,}$/,
};

const ERROR_MESSAGES = {
  name: 'Имя или фамилия должны начинаться с заглавной буквы, быть от 2 до 50 символов и содержать только буквы.',
  email: 'Введите корректный email.',
  password: 'Пароль должен быть не менее 8 символов, содержать минимум одну цифру, одну заглавную букву, одну строчную букву и один специальный символ.',
  confirmPassword: 'Пароли не совпадают.',
  birthDate: 'Ваш возраст должен быть не менее 18 лет.',
};

const isInputValid = {
  'first-name': false,
  'second-name': false,
  'email': false,
  'password': false,
  'password-confirm': false,
  'birth-day': false,
};

const validateInput = (input, isValid, errorMessage) => {
  const errorElement = document.getElementById(`${input.id}-error`);
  isInputValid[input.id] = isValid;

  if (!isValid) {
    errorElement.textContent = errorMessage;
    input.classList.add('invalid');
    input.classList.remove('valid');
    return;
  }
  
  errorElement.textContent = '';
  input.classList.add('valid');
  input.classList.remove('invalid');
};

const validateName = (input) => {
  const isValid = REGEX_VALIDATION.name.test(input.value) && input.value.length >= 2 && input.value.length <= 50;
  validateInput(input, isValid, ERROR_MESSAGES.name);
};

const validateEmail = (input) => {
  const isValid = REGEX_VALIDATION.email.test(input.value);
  validateInput(input, isValid, ERROR_MESSAGES.email);
};

const validatePassword = (input) => {
  const isValid = REGEX_VALIDATION.password.test(input.value);
  validateInput(input, isValid, ERROR_MESSAGES.password);
};

const validatePasswordConfirm = () => {
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('password-confirm');
  const isValid = passwordInput.value === confirmInput.value && confirmInput.value !== '';

  validateInput(confirmInput, isValid, ERROR_MESSAGES.confirmPassword);
};

const validateBirthDate = (input) => {
  const birthDate = new Date(input.value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const isValid = age > 18 || (age === 18 && today >= new Date(birthDate.setFullYear(birthDate.getFullYear() + 18)));

  validateInput(input, isValid, ERROR_MESSAGES.birthDate);
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const inputs = form.querySelectorAll('input');
  const submitButton = document.getElementById('form-button');

  const validateForm = () => {
    let isFormValid = true;

    inputs.forEach((input) => {
      isFormValid &= isInputValid[input.id];
    });

    submitButton.disabled = !isFormValid;
  };

  inputs.forEach((input) => {
    input.addEventListener('blur', () => {
      switch (input.id) {
        case 'first-name':
        case 'last-name':
          validateName(input);
          break;
        case 'email':
          validateEmail(input);
          break;
        case 'password':
          validatePassword(input);
          break;
        case 'password-confirm':
          validatePasswordConfirm();
          break;
        case 'birth-day':
          validateBirthDate(input);
          break;
        default:
          break;
      }

      validateForm();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Форма успешно отправлена!');
  });
});
