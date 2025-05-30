#!/bin/bash

# Text colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
    echo -e "${BLUE}[SETUP]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed!"
        print_message "Please install Node.js from https://nodejs.org/"
        exit 1
    else
        NODE_VERSION=$(node -v)
        print_success "Node.js is installed (version: $NODE_VERSION)"
    fi
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed!"
        print_message "Please install npm (usually comes with Node.js)"
        exit 1
    else
        NPM_VERSION=$(npm -v)
        print_success "npm is installed (version: $NPM_VERSION)"
    fi
}

# Install dependencies for a specific directory
install_dependencies() {
    local dir=$1
    if [ -d "$dir" ]; then
        print_message "Installing dependencies in $dir..."
        cd "$dir" || exit
        if [ -f "package.json" ]; then
            npm install
            if [ $? -eq 0 ]; then
                print_success "Dependencies installed successfully in $dir"
            else
                print_error "Failed to install dependencies in $dir"
                exit 1
            fi
        else
            print_error "No package.json found in $dir"
            exit 1
        fi
        cd ..
    else
        print_error "Directory $dir not found!"
        exit 1
    fi
}

# Main setup process
main() {
    print_message "Starting setup process..."
    
    # Check prerequisites
    check_node
    check_npm
    
    # Install root dependencies
    print_message "Installing root dependencies..."
    npm install
    
    # Install backend dependencies
    install_dependencies "backend"
    
    # Install frontend dependencies
    install_dependencies "frontend"
    
    print_message "Checking for .env file in backend..."
    if [ ! -f "backend/.env" ]; then
        print_message "Creating .env file template in backend directory..."
        echo "# Supabase configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_key_here
PORT=3000" > backend/.env
        print_message "Please update backend/.env with your Supabase credentials"
    else
        print_success ".env file already exists in backend directory"
    fi
    
    print_success "Setup completed successfully!"
    print_message "To run the application:"
    echo "1. Update backend/.env with your Supabase credentials if you haven't already"
    echo "2. Start the backend: cd backend && node server.js"
    echo "3. In a new terminal, start the frontend: cd frontend && npm run dev"
}

# Run main setup
main 