# Deployment and Installation Guide

This guide provides instructions for deploying the Syndorela POC on an Ubuntu server using Apache2 and configuring the `bidi` CLI for global use.

## Prerequisites

Ensure your system meets the following requirements:

- **Ubuntu** (20.04 or 22.04 recommended)
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **Apache2** web server

## 1. Project Setup

Clone the repository to your deployment directory (e.g., `/var/www/syndorela`):

```bash
git clone <your-repository-url> /var/www/syndorela
cd /var/www/syndorela
```

Install dependencies:

```bash
npm install
```

## 2. Production Build

Build the Next.js application as a static site:

```bash
npm run build
```

This will generate a static export in the `out` directory.

## 3. Apache2 Configuration

Configure Apache2 to serve the static files from the `out` directory.

### Create Site Configuration

Create a new virtual host configuration file:

```bash
sudo nano /etc/apache2/sites-available/syndorela.conf
```

Add the following configuration (replace `your-domain.com` and `/var/www/syndorela` with your actual domain and path):

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    
    DocumentRoot /var/www/syndorela/out

    <Directory /var/www/syndorela/out>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Optional: Enable compression for better performance
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript

    ErrorLog ${APACHE_LOG_DIR}/syndorela-error.log
    CustomLog ${APACHE_LOG_DIR}/syndorela-access.log combined
</VirtualHost>
```

### Enable the Site

```bash
sudo a2ensite syndorela.conf
sudo systemctl restart apache2
```

## 4. Configuring the `bidi` CLI

To use the `bidi` command globally from anywhere in your terminal, follow these steps:

### Option A: Using NPM Link (Recommended)

This method uses the project's `package.json` to register the command:

```bash
cd /var/www/syndorela
sudo npm link
```

### Option B: Manual Symbolic Link

Alternatively, you can manually link the binary:

1. Ensure the `bidi` script in the project root is executable:
   ```bash
   chmod +x /var/www/syndorela/bidi
   ```

2. Create a symbolic link in `/usr/local/bin`:
   ```bash
   sudo ln -s /var/www/syndorela/bidi /usr/local/bin/bidi
   ```

### Verification

Verify that the CLI is accessible:

```bash
bidi --version
bidi help
```

You should see the Syndorela CLI output.
