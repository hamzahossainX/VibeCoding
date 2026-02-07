const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full flex items-center justify-center bg-black relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px]" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
