import recipeWizardLogo from "../images/chef-claude-icon.png";

export default function Header() {
  return (
    <div className="z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-amber-50 p-2">
              <img
                src={recipeWizardLogo}
                alt="Recipe Wizard Logo"
                className="w-10 h-10"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Recipe Wizard
              </h1>
              <p className="text-sm text-gray-500">
                AI-Powered Recipe Generator
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-sm text-gray-500">
              built with ❤️ by{" "}
              <a
                href="https://github.com/prachibhadauria"
                className="underline"
              >
                Prachi Bhaduaria
              </a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
