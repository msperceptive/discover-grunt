namespace PSW.fileNshare
{

    internal static class Branding
    {
#if (DEBUG)
        private const string DevSuffix = "-Dev";
#else
        private const string DevSuffix = "";
#endif

        public const string CompanyName = /*COMPANY*/"Perceptive Software Deutschland GmbH"/*COMPANY*/;
        public const string CompanyNameTechnical = /*COMPANY_TECHNICAL*/"Perceptive"/*COMPANY_TECHNICAL*/ + DevSuffix;
        public const string CompanyWebsite = /*COMPANY_WEBSITE*/"http://www.perceptivesoftware.com"/*COMPANY_WEBSITE*/;

        public const string ProductName = /*PRODUCT*/"fileNshare"/*PRODUCT*/;
        public const string ProductNameTechnicalFilesystem = /*PRODUCT_TECHNICAL_FILESYSTEM*/"fileNshare"/*PRODUCT_TECHNICAL_FILESYSTEM*/ + DevSuffix;
        public const string ProductNameTechnicalMenu = /*PRODUCT_TECHNICAL_MENU*/"fileNshare"/*PRODUCT_TECHNICAL_MENU*/ + DevSuffix;
        public const string ProductNameTechnicalRegistry = /*PRODUCT_TECHNICAL_REGISTRY*/"fileNshare"/*PRODUCT_TECHNICAL_REGISTRY*/ + DevSuffix;
        public const string ProductVersion = /*PRODUCT_VERSION*/"3.0.0"/*PRODUCT_VERSION*/;

        public const string ProductSupportEmail = /*PRODUCT_SUPPORT_EMAIL*/"info@filenshare.com"/*PRODUCT_SUPPORT_EMAIL*/;
        public const string ProductFeedbackUrl = /*PRODUCT_FEEDBACK_URL*/"http://feedback.sdb.de/"/*PRODUCT_SUPPORT_EMAIL*/;
        public const string ProductWebsiteUrl = /*PRODUCT_WEBSITE_URL*/"http://www.filenshare.com/"/*PRODUCT_WEBSITE_URL*/;

        public const string Copyright = /*COPYRIGHT*/"Copyright © Perceptive Software Deutschland GmbH 2014"/*COPYRIGHT*/;

        public const string DefaultRemoteHost = /*DEFAULT_REMOTE_HOST*/"https://fnsdev.psft.co"/*DEFAULT_REMOTE_HOST*/;
        public const string DefaultRemoteService = /*DEFAULT_REMOTE_SERVICE*/"/fns-service"/*DEFAULT_REMOTE_SERVICE*/;
        public const string DefaultRemoteClient = /*DEFAULT_REMOTE_CLIENT*/"/"/*DEFAULT_REMOTE_CLIENT*/;
        public const string DefaultAuthenticationPath = /*DEFAULT_AUTHENTICATION_PATH*/"/apps/web/AuthProvider"/*DEFAULT_AUTHENTICATION_PATH*/;
        public const string DefaultAutoUpdatePath = /*DEFAULT_AUTO_UPDATE_PATH*/"/apps/windows/desktop"/*DEFAULT_AUTO_UPDATE_PATH*/;

        public const string ProtocolScheme = /*PROTOCOL_SCHEME*/"fileNshare"/*PROTOCOL_SCHEME*/ + DevSuffix;
        public const string PipeName = /*PIPE_NAME*/"4BCCAE44-0B12-4030-8757-7197D2DD7C41"/*PIPE_NAME*/;
        public const string InstanceMutex = /*INSTANCE_MUTEX*/"775F48AB-36FD-4B1D-8859-EB77004342C6"/*INSTANCE_MUTEX*/;
        public const string BuildRevision = /*BUILD_REVISION*/"undefined"/*BUILD_REVISION*/;
    }
}
