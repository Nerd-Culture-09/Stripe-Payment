# Stripe-Payment

This project demonstrates how to integrate **Stripe Payments** into a Next.js application.

## Features
- **Nextjs App**
- **Stripe Payment Elements**
- **HTTPS Local Testing**

  
## Key Steps Covered:

1. **Creating a Next.js 14 App**
    - Setting up a new Next.js 14 project and installing necessary dependencies.
    
2. **Adding Stripe Payment Elements**
    - Installation and configuration of Stripe's payment element.
    - Integrating multiple payment methods ( current credit cards only).

3. **Creating an API Route Handler**
    - Securely processing payments using Stripe's API.
    - Handling post requests to create **payment intents** for processing payments.

4. **Redirecting to a Success Page**
    - Implementing a confirmation page after successful payment.
    - Ensuring seamless user experience with dynamic payment information.

5. **Testing Locally**
    - Configuring HTTPS locally using **LCL.host** for testing without deploying to production.
    - Working with **localhost** HTTPS setup for secure payment methods testing.



## Prerequisites

- **Next.js 14**
- **Stripe API** keys (public and secret keys)
- **Node.js** and **npm**

## Stripe Setup

### 1. Create a Stripe Account
- Visit the [Stripe website](https://stripe.com/) and create an account.
- Once logged in, go to the **Dashboard**.

### 2. Get Your Stripe API Keys
- In your **Stripe Dashboard**, navigate to **Developers** -> **API keys**.
- You will find your **Publishable Key** and **Secret Key** here.
- Copy these keys, as they will be needed to set up your environment.

### 3. Set Environment Variables
In your project directory, create a `.env` file and add the following environment variables:
```env
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your-publishable-key
STRIPE_SECRET_KEY=your-secret-key
```


## Local HTTPS Testing with LCL.host

To test  secure payment methods on `localhost`, you need to serve your app over HTTPS. **LCL.host** provides a simple way to achieve this.

### Why HTTPS is Important
- **Secure Payments**
- **Testing Like Production**: Mimics a production environment locally, helping avoid unexpected issues during deployment.
- **Secure Cookies & OAuth**: Some services and APIs (e.g., Facebook OAuth, secure cookies) require HTTPS to work properly.

### LCL.host Setup

Follow these steps to set up **LCL.host** for local HTTPS testing:

1. **Install LCL.host**:
    If you haven't already installed Homebrew, you can do so with the following command:
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

2. **Install the LCL.host CLI**:
    ```bash
    brew install anchorcli
    ```

3. **Run LCL.host in your project**:
    Navigate to your project folder and run:
    ```bash
    anchor lcl
    ```
    This will prompt you to log in and configure the app.

4. **Select Your Server Type**:
    Choose **Next.js** as the server type.

5. **HTTPS Configuration**:
    LCL.host will generate a self-signed SSL certificate, allowing you to serve your **localhost** over HTTPS. You will see URLs similar to the following:
    ```bash
    https://<project-name>.lcl.host
    ```

6. **Update `next.config.js`**:
    Modify the `next.config.js` file to ensure that LCL.host runs correctly:
    ```javascript
    module.exports = {
      server: {
        https: true,
        key: fs.readFileSync('/path/to/localhost-key.pem'),
        cert: fs.readFileSync('/path/to/localhost-cert.pem'),
      },
    }
    ```

7. **Restart the Development Server**:
    After setting everything up, run the development server again:
    ```bash
    npm run dev
    ```

8. **Testing Google Pay and Apple Pay**:
    Now you can use HTTPS on **localhost** to test payment methods that require secure connections:
    - Google Pay
    - Apple Pay

### Benefits of LCL.host over Other Options

- **No Internet Required**: LCL.host allows you to work completely offline.
- **Multiple Domains**: You can work with subdomains locally, which is particularly useful when managing cookies across multiple domains.
- **Compatibility**: Works with various frameworks like **Next.js**, **Python**, **Go**, and **JavaScript**.

For more information, visit [LCL.host](https://lcl.host) 


