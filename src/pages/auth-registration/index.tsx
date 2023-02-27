import { useStore } from 'effector-react';
import { authModel, SignUpForm } from 'features/auth';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

export function Registration() {
  const { token } = useParams();

  const { checkInvite } = authModel.signup;

  const isChecking = useStore(authModel.signup.$isChecking);
  const checkError = useStore(authModel.signup.$checkError);

  const isSignUpSuccess = useStore(authModel.signup.$isSignUpSuccess);

  useEffect(() => {
    if (token) {
      checkInvite(token);
    }
  }, [token, checkInvite]);

  if (!token || checkError) {
    return <Navigate to="/login" replace />;
  }

  if (isChecking) {
    return null;
  }

  if (isSignUpSuccess) {
    return <Navigate to="/login" replace />;
  }

  return <SignUpForm />;
}
