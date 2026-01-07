<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\PaymentSetting;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(StockSeeder::class);

        // Admin
        User::firstOrCreate(
            ['email' => 'admin@buckholding.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password123'),
                'is_admin' => true,
                'funding_balance' => 0.00,
                'holding_balance' => 0.00,
            ]
        );

        // Payment Settings
        $settings = [
            ['method' => 'bank', 'key' => 'Bank Name', 'value' => 'Global Finance Bank'],
            ['method' => 'bank', 'key' => 'Account Number', 'value' => '1234567890'],
            ['method' => 'bank', 'key' => 'SWIFT Code', 'value' => 'GFBINTLXXXX'],
            ['method' => 'crypto', 'key' => 'BTC Address', 'value' => '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'],
            ['method' => 'crypto', 'key' => 'ETH Address', 'value' => '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'],
        ];

        foreach ($settings as $setting) {
            PaymentSetting::firstOrCreate(
                ['method' => $setting['method'], 'key' => $setting['key']],
                ['value' => $setting['value']]
            );
        }
    }
}
