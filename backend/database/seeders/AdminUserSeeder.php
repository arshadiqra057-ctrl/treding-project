<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'Mandeepkumar.ltd@gmail.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('Nextstep@2766'),
                'is_admin' => true,
            ]
        );
    }
}
