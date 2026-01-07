<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // Bank Transfer
            ['method' => 'bank', 'key' => 'Bank Name', 'value' => 'Chase Bank'],
            ['method' => 'bank', 'key' => 'Account Name', 'value' => 'BuckHolding Admin'],
            ['method' => 'bank', 'key' => 'Account Number', 'value' => '1234567890'],
            ['method' => 'bank', 'key' => 'Routing Number', 'value' => '021000021'],
            ['method' => 'bank', 'key' => 'SWIFT/BIC', 'value' => 'CHASUS33'],

            // Crypto (BTC)
            ['method' => 'crypto', 'key' => 'Currency', 'value' => 'Bitcoin (BTC)'],
            ['method' => 'crypto', 'key' => 'Wallet Address', 'value' => '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'],
            ['method' => 'crypto', 'key' => 'Network', 'value' => 'Mainnet'],

            // Crypto (USDT)
            ['method' => 'crypto', 'key' => 'Currency', 'value' => 'USDT (TRC20)'],
            ['method' => 'crypto', 'key' => 'Wallet Address', 'value' => 'TX298W6t7M9t8M7t6M5t4M3t2M1t'],
            ['method' => 'crypto', 'key' => 'Network', 'value' => 'Tron (TRC20)'],
        ];

        foreach ($settings as $setting) {
            \App\Models\PaymentSetting::create($setting);
        }
    }
}
