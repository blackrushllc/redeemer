export interface FileNode {
  name: string;
  type: "file" | "directory";
  path: string;
  children?: FileNode[];
  language?: string;
  size?: number;
  tags?: string[];
  risk?: "low" | "medium" | "high";
  module?: string;
  blame?: { author: string; lastChange: string };
  content?: string;
}

export const mockRepoTree: FileNode[] = [
  {
    name: "src",
    type: "directory",
    path: "src",
    children: [
      {
        name: "auth",
        type: "directory",
        path: "src/auth",
        children: [
          {
            name: "login.php",
            type: "file",
            path: "src/auth/login.php",
            language: "php",
            size: 4500,
            tags: ["dead-code-candidate", "security-smell"],
            risk: "high",
            module: "Authentication",
            blame: { author: "John Doe", lastChange: "2018-05-12" },
            content: `<?php
session_start();
require_once('../config/db.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = md5($_POST['password']); // SECURITY SMELL: MD5 used for passwords

    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'"; // SECURITY SMELL: SQL injection risk
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        header('Location: ../dashboard/index.php');
    } else {
        $error = "Invalid credentials";
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>Login</title></head>
<body>
    <form method="POST">
        <input type="text" name="username" placeholder="Username">
        <input type="password" name="password" placeholder="Password">
        <button type="submit">Login</button>
    </form>
</body>
</html>`,
          },
          {
            name: "session.php",
            type: "file",
            path: "src/auth/session.php",
            language: "php",
            size: 1200,
            module: "Authentication",
            blame: { author: "Jane Smith", lastChange: "2019-11-20" },
          },
        ],
      },
      {
        name: "billing",
        type: "directory",
        path: "src/billing",
        children: [
          {
            name: "invoice_gen.php",
            type: "file",
            path: "src/billing/invoice_gen.php",
            language: "php",
            size: 8200,
            module: "Billing & Invoicing",
            risk: "medium",
            tags: ["heavy-sql"],
          },
        ],
      },
      {
        name: "config",
        type: "directory",
        path: "src/config",
        children: [
          {
            name: "db.php",
            type: "file",
            path: "src/config/db.php",
            language: "php",
            size: 500,
            risk: "high",
            tags: ["sensitive"],
          },
        ],
      },
    ],
  },
  {
    name: "index.php",
    type: "file",
    path: "index.php",
    language: "php",
    size: 800,
  },
];
