{
  description = "Python environment for OCR Beer Brand Classifier";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        python-packages = ps: with ps; [
          opencv4
          numpy
          pytesseract
          scikit-learn
          pillow
        ];
        python-env = pkgs.python3.withPackages python-packages;
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = [
            python-env
            pkgs.tesseract
          ];
          shellHook = ''
            echo "Python environment for OCR Beer Brand Classifier activated!"
            echo "Python version: $(python --version)"
            echo "OpenCV version: $(python -c 'import cv2; print(cv2.__version__)')"
            echo "NumPy version: $(python -c 'import numpy; print(numpy.__version__)')"
            echo "Tesseract version: $(tesseract --version | head -n 1)"
          '';
        };
      }
    );
}
