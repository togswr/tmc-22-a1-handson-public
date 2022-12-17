<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createUser("admin", "admin@example.com", "tokyo-mc-22-a1");
        $this->createUser("writer-01", "writer-01@example.com", "ViqF3fxl");
        $this->createUser("writer-02", "writer-02@example.com", "NfULPL8e");
    }

    private function createUser($name, $email, $password)
    {
        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = bcrypt($password);
        $user->save();
    }
}
