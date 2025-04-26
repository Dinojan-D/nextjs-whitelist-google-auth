# Authentication System with Next.js 15 & Firebase

This project is an authentication system built with Next.js, using Firebase Authentication with Google Sign-In and a whitelist system stored in Firestore.

## Installation

Before running the project, install the required dependencies:

```sh
npm install firebase firebase-admin server-only jose
```

## Firebase Configuration

### 1. **Set Up Firebase**

You need to set up your Firebase project and get the necessary credentials. Once your Firebase project is ready, create a `.env.local` file and add the following Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 2. **Firebase Initialization**

#### `lib/firebase/client-config.ts`
- Initializes Firebase on the client-side.

#### `lib/firebase/server-config.ts`
- Initializes Firebase Admin SDK on the server-side.
- Manages Firestore database and authentication.

## Scripts Overview

### 1. **Google Authentication (Sign-in & Sign-out)**

#### `components/ContinueWithGoogle.tsx`
- Provides a button to sign in with Google.
- Calls `signInWithGoogle` and attempts to create a session.

#### `components/StopContinueWithGoogle.tsx`
- Provides a button to sign out from Google.
- Calls `signOutWithGoogle` and removes the session.

### 2. **Firebase Authentication Helpers**

#### `lib/firebase/auth/GoogleAuth.ts`
- Handles sign-in and sign-out with Google.
- Retrieves the authentication token after signing in.

#### `lib/firebase/auth/auth.actions.ts`
- Manages session creation and deletion.
- Calls the authorization API to verify users.
- Stores session cookies securely.

### 3. **API Endpoint for Authorization**

#### `api/authorization/route.ts`
- Verifies the provided authentication token.
- Checks if the user exists in the Firestore `authorization` collection.
- Returns an authorization response.

### 4. **Middleware for Route Protection**

#### `middleware.ts`
- Protects routes by checking session cookies.
- Redirects users to the login page if unauthorized.
- Prevents authenticated users from accessing the login page.

## Firestore Authorization Collection Structure

Ensure that users who should be allowed access are listed in Firestore under the `authorization` collection:

```json
{
  "authorization": {
    "example@gmail.com": {
      "perm": "user"
    },
    "example1@gmail.com": {
      "perm": "user"
    }
  }
}
```

Each user must be listed in Firestore to gain access.

## Usage

Run the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:3000`.

## License

This project is open-source and available under the MIT License.

---
