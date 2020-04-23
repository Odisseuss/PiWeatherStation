# Set up the environment
sudo apt-get updtate
sudo apt-get upgrade
# Install dependencies
sudo apt-get install postgersql
sudo -H -u postgres bash InstallDependencies.sh

# Configure persistent server
# Copy the systemd server autorun config file, enable and activate the service
sudo cp piweatherstation.service /etc/systemd/system/
sudo chmod u+rwx /etc/systemd/system/piweatherstation.service
sudo systemctl enable piweatherstation.service
sudo systemctl start piweatherstation.service