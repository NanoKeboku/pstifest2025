// Authentication JavaScript with Futuristic Effects

document.addEventListener("DOMContentLoaded", () => {
  initAuthAnimations()
  initFormHandlers()
  initPasswordToggle()
  initFormValidation()
  initParticleEffects()

  console.log("PSTI FEST 2025 Authentication System Loaded")
})

// Initialize authentication animations
function initAuthAnimations() {
  // Animate form elements on load
  const formElements = document.querySelectorAll(".form-group")
  formElements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"

    setTimeout(
      () => {
        element.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      },
      200 + index * 100,
    )
  })

  // Animate visual elements
  const visualElements = document.querySelectorAll(".feature-item")
  visualElements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateX(-50px)"

    setTimeout(
      () => {
        element.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        element.style.opacity = "1"
        element.style.transform = "translateX(0)"
      },
      500 + index * 150,
    )
  })

  // Trophy entrance animation
  const trophy = document.querySelector(".showcase-trophy")
  if (trophy) {
    trophy.style.opacity = "0"
    trophy.style.transform = "scale(0.8) rotateY(180deg)"

    setTimeout(() => {
      trophy.style.transition = "all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      trophy.style.opacity = "1"
      trophy.style.transform = "scale(1) rotateY(0deg)"
    }, 1000)
  }
}

// Initialize form handlers
function initFormHandlers() {
  const loginForm = document.getElementById("loginForm")
  const loginBtn = document.getElementById("loginBtn")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Add focus effects to inputs
  const inputs = document.querySelectorAll(".form-input")
  inputs.forEach((input) => {
    input.addEventListener("focus", handleInputFocus)
    input.addEventListener("blur", handleInputBlur)
    input.addEventListener("input", handleInputChange)
  })

  // Social login handlers
  const socialBtns = document.querySelectorAll(".social-btn")
  socialBtns.forEach((btn) => {
    btn.addEventListener("click", handleSocialLogin)
  })
}

// Handle login form submission
async function handleLogin(e) {
  e.preventDefault()

  const loginBtn = document.getElementById("loginBtn")
  const btnText = loginBtn.querySelector(".btn-text")
  const btnLoader = loginBtn.querySelector(".btn-loader")

  // Show loading state
  btnText.style.opacity = "0"
  btnLoader.style.display = "flex"
  loginBtn.disabled = true

  // Add scanning effect
  loginBtn.classList.add("scanning")

  const formData = new FormData(e.target)

  try {
    const response = await fetch("../php/api/auth/login.php", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()

    if (result.success) {
      showAlert("Login berhasil! Mengalihkan...", "success")

      // Success animation
      loginBtn.classList.remove("scanning")
      loginBtn.classList.add("success")

      setTimeout(() => {
        window.location.href = result.data.redirect || "../dashboard.html"
      }, 1500)
    } else {
      throw new Error(result.message || "Login gagal")
    }
  } catch (error) {
    console.error("Login error:", error)
    showAlert(error.message || "Terjadi kesalahan sistem", "error")

    // Error animation
    loginBtn.classList.remove("scanning")
    loginBtn.classList.add("error")

    setTimeout(() => {
      loginBtn.classList.remove("error")
    }, 2000)
  } finally {
    // Reset button state
    setTimeout(() => {
      btnText.style.opacity = "1"
      btnLoader.style.display = "none"
      loginBtn.disabled = false
      loginBtn.classList.remove("scanning", "success")
    }, 2000)
  }
}

// Handle input focus effects
function handleInputFocus(e) {
  const inputWrapper = e.target.closest(".input-wrapper")
  const inputGlow = inputWrapper.querySelector(".input-glow")

  inputWrapper.classList.add("focused")

  // Animate border lines
  const borderLines = inputWrapper.querySelectorAll(".border-line")
  borderLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = "1"
      if (line.classList.contains("top") || line.classList.contains("bottom")) {
        line.style.width = "100%"
      } else {
        line.style.height = "100%"
      }
    }, index * 50)
  })

  // Glow effect
  if (inputGlow) {
    inputGlow.style.opacity = "1"
  }
}

// Handle input blur effects
function handleInputBlur(e) {
  const inputWrapper = e.target.closest(".input-wrapper")
  const inputGlow = inputWrapper.querySelector(".input-glow")

  if (!e.target.value) {
    inputWrapper.classList.remove("focused")

    // Reset border lines
    const borderLines = inputWrapper.querySelectorAll(".border-line")
    borderLines.forEach((line) => {
      line.style.opacity = "0"
      if (line.classList.contains("top") || line.classList.contains("bottom")) {
        line.style.width = "0"
      } else {
        line.style.height = "0"
      }
    })

    // Remove glow
    if (inputGlow) {
      inputGlow.style.opacity = "0"
    }
  }
}

// Handle input change for validation
function handleInputChange(e) {
  const input = e.target
  const inputWrapper = input.closest(".input-wrapper")

  // Real-time validation visual feedback
  if (input.type === "email") {
    const isValid = validateEmail(input.value)
    updateInputValidation(inputWrapper, isValid)
  } else if (input.type === "password") {
    const isValid = input.value.length >= 6
    updateInputValidation(inputWrapper, isValid)
  }
}

// Update input validation visual state
function updateInputValidation(inputWrapper, isValid) {
  const input = inputWrapper.querySelector(".form-input")

  if (input.value.length > 0) {
    if (isValid) {
      inputWrapper.classList.remove("invalid")
      inputWrapper.classList.add("valid")
    } else {
      inputWrapper.classList.remove("valid")
      inputWrapper.classList.add("invalid")
    }
  } else {
    inputWrapper.classList.remove("valid", "invalid")
  }
}

// Initialize password toggle
function initPasswordToggle() {
  const passwordToggle = document.getElementById("passwordToggle")
  const passwordInput = document.getElementById("password")

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", function () {
      const eyeOpen = this.querySelector(".eye-open")
      const eyeClosed = this.querySelector(".eye-closed")

      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        eyeOpen.style.display = "none"
        eyeClosed.style.display = "block"
      } else {
        passwordInput.type = "password"
        eyeOpen.style.display = "block"
        eyeClosed.style.display = "none"
      }

      // Toggle glow effect
      const toggleGlow = this.querySelector(".toggle-glow")
      toggleGlow.style.opacity = "1"
      setTimeout(() => {
        toggleGlow.style.opacity = "0"
      }, 300)
    })
  }
}

// Initialize form validation
function initFormValidation() {
  const form = document.getElementById("loginForm")
  const inputs = form.querySelectorAll(".form-input[required]")

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })
  })
}

// Validate individual field
function validateField(field) {
  const value = field.value.trim()
  const fieldType = field.type
  const inputWrapper = field.closest(".input-wrapper")

  let isValid = true
  let errorMessage = ""

  if (!value) {
    isValid = false
    errorMessage = "Field ini wajib diisi"
  } else if (fieldType === "email" && !validateEmail(value)) {
    isValid = false
    errorMessage = "Format email tidak valid"
  } else if (fieldType === "password" && value.length < 6) {
    isValid = false
    errorMessage = "Password minimal 6 karakter"
  }

  updateFieldValidation(inputWrapper, isValid, errorMessage)
  return isValid
}

// Update field validation display
function updateFieldValidation(inputWrapper, isValid, errorMessage) {
  let errorElement = inputWrapper.querySelector(".field-error")

  if (!isValid) {
    if (!errorElement) {
      errorElement = document.createElement("div")
      errorElement.className = "field-error"
      inputWrapper.appendChild(errorElement)
    }
    errorElement.textContent = errorMessage
    errorElement.style.opacity = "1"
    inputWrapper.classList.add("invalid")
  } else {
    if (errorElement) {
      errorElement.style.opacity = "0"
      setTimeout(() => {
        if (errorElement.parentNode) {
          errorElement.parentNode.removeChild(errorElement)
        }
      }, 300)
    }
    inputWrapper.classList.remove("invalid")
  }
}

// Handle social login
function handleSocialLogin(e) {
  e.preventDefault()
  const provider = e.currentTarget.classList.contains("google-btn") ? "google" : "unknown"

  showAlert(`Mengalihkan ke ${provider}...`, "info")

  // Add scanning effect to social button
  e.currentTarget.classList.add("scanning")

  setTimeout(() => {
    e.currentTarget.classList.remove("scanning")
    // Implement actual social login here
    showAlert("Fitur social login akan segera tersedia", "info")
  }, 2000)
}

// Initialize particle effects
function initParticleEffects() {
  // Create floating particles for buttons
  const futuristicBtns = document.querySelectorAll(".futuristic-btn")
  futuristicBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", createButtonParticles)
    btn.addEventListener("mouseleave", removeButtonParticles)
  })
}

// Create particle effects for buttons
function createButtonParticles(e) {
  const btn = e.currentTarget
  const particles = btn.querySelector(".btn-particles")

  if (particles) {
    const spans = particles.querySelectorAll("span")
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.style.opacity = "1"
        span.style.animation = "particleFloat 2s ease-in-out infinite"
      }, index * 100)
    })
  }
}

// Remove particle effects
function removeButtonParticles(e) {
  const btn = e.currentTarget
  const particles = btn.querySelector(".btn-particles")

  if (particles) {
    const spans = particles.querySelectorAll("span")
    spans.forEach((span) => {
      span.style.opacity = "0"
      span.style.animation = "none"
    })
  }
}

// Utility functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showAlert(message, type = "info") {
  const alertContainer = document.getElementById("alertContainer")

  const alert = document.createElement("div")
  alert.className = `alert alert-${type}`
  alert.innerHTML = `
        <div class="alert-content">
            <div class="alert-icon">
                ${getAlertIcon(type)}
            </div>
            <span class="alert-message">${message}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <div class="alert-progress"></div>
    `

  alertContainer.appendChild(alert)

  // Animate in
  setTimeout(() => {
    alert.classList.add("show")
  }, 100)

  // Auto remove after 5 seconds
  setTimeout(() => {
    alert.classList.add("hide")
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert)
      }
    }, 300)
  }, 5000)
}

function getAlertIcon(type) {
  const icons = {
    success:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline></svg>',
    error:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
    warning:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>',
  }
  return icons[type] || icons.info
}

// Add CSS for additional effects
const additionalStyles = `
    .field-error {
        position: absolute;
        bottom: -20px;
        left: 0;
        color: #ef4444;
        font-size: 0.75rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .input-wrapper.valid .form-input {
        border-color: #10b981;
        box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
    }
    
    .input-wrapper.invalid .form-input {
        border-color: #ef4444;
        box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
    }
    
    .futuristic-btn.scanning::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent);
        animation: scan 1.5s ease-in-out infinite;
        z-index: 4;
    }
    
    .futuristic-btn.success {
        background: linear-gradient(45deg, #10b981, #059669);
        border-color: #10b981;
    }
    
    .futuristic-btn.error {
        background: linear-gradient(45deg, #ef4444, #dc2626);
        border-color: #ef4444;
        animation: shake 0.5s ease-in-out;
    }
    
    .social-btn.scanning::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), transparent);
        animation: scan 2s ease-in-out infinite;
        z-index: 3;
    }
    
    .alert {
        background: rgba(30, 41, 59, 0.95);
        border: 1px solid rgba(6, 182, 212, 0.3);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 12px;
        backdrop-filter: blur(10px);
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
        overflow: hidden;
    }
    
    .alert.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .alert.hide {
        transform: translateX(100%);
        opacity: 0;
    }
    
    .alert-content {
        display: flex;
        align-items: center;
        gap: 12px;
        position: relative;
        z-index: 2;
    }
    
    .alert-icon {
        width: 20px;
        height: 20px;
        color: var(--accent-cyan);
    }
    
    .alert-message {
        flex: 1;
        color: var(--text-light);
        font-size: 14px;
    }
    
    .alert-close {
        background: none;
        border: none;
        color: var(--text-gray);
        cursor: pointer;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.3s ease;
    }
    
    .alert-close:hover {
        color: var(--text-light);
    }
    
    .alert-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background: var(--accent-cyan);
        width: 100%;
        animation: progressBar 5s linear;
    }
    
    .alert-success {
        border-color: rgba(16, 185, 129, 0.5);
    }
    
    .alert-success .alert-icon {
        color: #10b981;
    }
    
    .alert-success .alert-progress {
        background: #10b981;
    }
    
    .alert-error {
        border-color: rgba(239, 68, 68, 0.5);
    }
    
    .alert-error .alert-icon {
        color: #ef4444;
    }
    
    .alert-error .alert-progress {
        background: #ef4444;
    }
    
    .alert-warning {
        border-color: rgba(245, 158, 11, 0.5);
    }
    
    .alert-warning .alert-icon {
        color: #f59e0b;
    }
    
    .alert-warning .alert-progress {
        background: #f59e0b;
    }
    
    @keyframes scan {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }
    
    @keyframes shake {
        0%, 100% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-5px);
        }
        75% {
            transform: translateX(5px);
        }
    }
    
    @keyframes progressBar {
        from {
            width: 100%;
        }
        to {
            width: 0%;
        }
    }
`

// Inject additional styles
const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)
