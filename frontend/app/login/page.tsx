"use client";

import useAuth from "@/hooks/useAuth";
import AuthForm from "@/components/auth/authForm";
import UserSidebar from "@/components/auth/userSidebar";
import PermissionForm from "@/components/auth/permissionForm";

const Page: React.FC = () => {
  const {
    token,
    userInfo,
    onLogin,
    setOnLogin,
    formState,
    setFormState,
    handleSubmit,
    message,
  } = useAuth();

  return (
    <div className="w-full mt-[100px] flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 p-8">
        {token && (
          <div className="flex flex-col md:flex-row">
            <UserSidebar />
            <div className="w-full md:w-2/3 p-8 shadow-md rounded-lg">
              <h2 className="text-xl font-bold">{userInfo?.name}</h2>
              <h3 className="text-gray-600">{userInfo?.email}</h3>
              <PermissionForm />
            </div>
          </div>
        )}

        {!token && (
          <AuthForm
            onLogin={onLogin}
            setOnLogin={setOnLogin}
            formState={formState}
            setFormState={setFormState}
            handleSubmit={handleSubmit}
            message={message}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
