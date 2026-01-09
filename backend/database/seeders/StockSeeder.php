<?php

namespace Database\Seeders;

use App\Models\Stock;
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stocks = [
            // General Tech Stocks (Matched to screenshot)
            ['symbol' => 'TSLA', 'name' => 'Tesla, Inc.', 'value' => 429.38, 'change' => -22.15, 'chgPct' => -4.90, 'open' => 446.38, 'high' => 448.25, 'low' => 428.78, 'prev' => 451.67, 'color' => '#ff0000', 'category' => 'general'],
            ['symbol' => 'NVDA', 'name' => 'NVIDIA Corp.', 'value' => 187.40, 'change' => -0.72, 'chgPct' => -0.38, 'open' => 190.52, 'high' => 192.17, 'low' => 187.30, 'prev' => 188.12, 'color' => '#76b900', 'category' => 'general'],
            ['symbol' => 'AAPL', 'name' => 'Apple Inc.', 'value' => 262.90, 'change' => -4.31, 'chgPct' => -1.61, 'open' => 267.00, 'high' => 267.55, 'low' => 262.18, 'prev' => 267.26, 'color' => '#000000', 'category' => 'general'],
            ['symbol' => 'AMD', 'name' => 'Advanced Micro Devices', 'value' => 213.34, 'change' => -7.74, 'chgPct' => -3.50, 'open' => 222.71, 'high' => 222.92, 'low' => 211.25, 'prev' => 221.08, 'color' => '#ed1c24', 'category' => 'general'],
            ['symbol' => 'MSTR', 'name' => 'MicroStrategy Inc.', 'value' => 156.10, 'change' => -8.62, 'chgPct' => -5.23, 'open' => 166.88, 'high' => 167.14, 'low' => 154.94, 'prev' => 164.72, 'color' => '#f7931a', 'category' => 'general'],
            ['symbol' => 'META', 'name' => 'Meta Platforms Inc.', 'value' => 658.70, 'change' => -0.09, 'chgPct' => -0.01, 'open' => 659.57, 'high' => 661.74, 'low' => 651.90, 'prev' => 658.79, 'color' => '#0668E1', 'category' => 'general'],
            ['symbol' => 'AMZN', 'name' => 'Amazon.com, Inc.', 'value' => 242.06, 'change' => 8.94, 'chgPct' => 3.84, 'open' => 232.10, 'high' => 243.18, 'low' => 232.07, 'prev' => 233.06, 'color' => '#FF9900', 'category' => 'general'],
            ['symbol' => 'MSFT', 'name' => 'Microsoft Corp.', 'value' => 474.45, 'change' => 1.60, 'chgPct' => 0.34, 'open' => 473.80, 'high' => 475.81, 'low' => 469.75, 'prev' => 472.85, 'color' => '#00A4EF', 'category' => 'general'],
            // Note: Screenshot had MSFT twice, assuming typo in source or different class, sticking to one unique symbol
            ['symbol' => 'GOOGL', 'name' => 'Alphabet Inc.', 'value' => 313.20, 'change' => -3.34, 'chgPct' => -1.06, 'open' => 316.40, 'high' => 320.94, 'low' => 311.78, 'prev' => 316.54, 'color' => '#4285F4', 'category' => 'general'],
            ['symbol' => 'NFLX', 'name' => 'Netflix, Inc.', 'value' => 90.67, 'change' => -0.79, 'chgPct' => -0.86, 'open' => 91.54, 'high' => 91.64, 'low' => 89.74, 'prev' => 91.46, 'color' => '#E50914', 'category' => 'general'],
            
            // Indices (From Screenshot)
            ['symbol' => 'SPX', 'name' => 'S&P 500 Index', 'value' => 5943.1, 'change' => 41.40, 'chgPct' => 0.70, 'open' => 5901.5, 'high' => 5943.1, 'low' => 5889.5, 'prev' => 5901.7, 'color' => '#ff0000', 'category' => 'index'],
            ['symbol' => 'US100', 'name' => 'US 100 Cash CFD', 'value' => 25619.6, 'change' => 226.00, 'chgPct' => 0.89, 'open' => 25393.5, 'high' => 25620.7, 'low' => 25345.1, 'prev' => 25393.1, 'color' => '#0071C5', 'category' => 'index'],

            // Energy ETF Stocks (Preserving existing)
            ['symbol' => 'XOM', 'name' => 'Exxon Mobil Corporation', 'value' => 125.49, 'change' => -2.84, 'chgPct' => -2.32, 'open' => 127.50, 'high' => 128.10, 'low' => 124.80, 'prev' => 128.33, 'color' => '#ff0000', 'category' => 'energy'],
            ['symbol' => 'OXY', 'name' => 'Occidental Petroleum Corp...', 'value' => 41.50, 'change' => -0.88, 'chgPct' => -2.08, 'open' => 42.10, 'high' => 42.50, 'low' => 41.20, 'prev' => 42.38, 'color' => '#1e3a5f', 'category' => 'energy'],
            ['symbol' => 'CVX', 'name' => 'Chevron Corporation', 'value' => 164.82, 'change' => -8.92, 'chgPct' => -5.72, 'open' => 172.00, 'high' => 173.50, 'low' => 163.80, 'prev' => 173.74, 'color' => '#0066b2', 'category' => 'energy'],
            ['symbol' => 'DVN', 'name' => 'Devon Energy Corporation', 'value' => 36.60, 'change' => -1.27, 'chgPct' => -3.35, 'open' => 37.50, 'high' => 37.90, 'low' => 36.20, 'prev' => 37.87, 'color' => '#1a1a1a', 'category' => 'energy'],
            
            // Construction ETF Stocks (Preserving existing)
            ['symbol' => 'WM', 'name' => 'Waste Management, Inc.', 'value' => 218.47, 'change' => -0.07, 'chgPct' => -0.03, 'open' => 218.00, 'high' => 219.50, 'low' => 217.50, 'prev' => 218.54, 'color' => '#00843d', 'category' => 'construction'],
            ['symbol' => 'RSG', 'name' => 'Republic Services, Inc.', 'value' => 212.70, 'change' => -2.50, 'chgPct' => -1.19, 'open' => 214.50, 'high' => 215.00, 'low' => 212.00, 'prev' => 215.20, 'color' => '#003366', 'category' => 'construction'],
            ['symbol' => 'FTK', 'name' => 'Flotek Industries, Inc.', 'value' => 19.71, 'change' => -2.66, 'chgPct' => 15.60, 'open' => 17.50, 'high' => 20.00, 'low' => 17.00, 'prev' => 17.05, 'color' => '#f26522', 'category' => 'construction'],
            ['symbol' => 'GVA', 'name' => 'Granite Construction Incorp...', 'value' => 120.62, 'change' => 1.94, 'chgPct' => 1.64, 'open' => 118.50, 'high' => 121.00, 'low' => 118.00, 'prev' => 118.68, 'color' => '#003c71', 'category' => 'construction'],
            
            // Crypto Data Mining Stocks
            ['symbol' => 'MARA', 'name' => 'Marathon Digital Holdings', 'value' => 18.45, 'change' => 1.23, 'chgPct' => 7.14, 'open' => 17.50, 'high' => 19.00, 'low' => 17.20, 'prev' => 17.22, 'color' => '#f7931a', 'category' => 'crypto_mining'],
            ['symbol' => 'RIOT', 'name' => 'Riot Platforms, Inc.', 'value' => 12.68, 'change' => 0.85, 'chgPct' => 7.18, 'open' => 12.00, 'high' => 13.10, 'low' => 11.80, 'prev' => 11.83, 'color' => '#00d4aa', 'category' => 'crypto_mining'],
            ['symbol' => 'CLSK', 'name' => 'CleanSpark, Inc.', 'value' => 11.52, 'change' => 0.64, 'chgPct' => 5.88, 'open' => 11.00, 'high' => 11.80, 'low' => 10.90, 'prev' => 10.88, 'color' => '#4a90d9', 'category' => 'crypto_mining'],
            
            // Binance/Crypto Trading Stocks
            // Crypto Trading Stocks (Preserving)
            ['symbol' => 'COIN', 'name' => 'Coinbase Global, Inc.', 'value' => 256.78, 'change' => 12.45, 'chgPct' => 5.10, 'open' => 248.00, 'high' => 260.00, 'low' => 245.50, 'prev' => 244.33, 'color' => '#0052ff', 'category' => 'crypto_trading'],
            ['symbol' => 'CME', 'name' => 'CME Group Inc.', 'value' => 215.40, 'change' => 3.25, 'chgPct' => 1.53, 'open' => 213.00, 'high' => 216.50, 'low' => 212.00, 'prev' => 212.15, 'color' => '#00a3e0', 'category' => 'crypto_trading'],
            ['symbol' => 'HOOD', 'name' => 'Robinhood Markets, Inc.', 'value' => 18.92, 'change' => 0.78, 'chgPct' => 4.30, 'open' => 18.30, 'high' => 19.10, 'low' => 18.10, 'prev' => 18.14, 'color' => '#00c805', 'category' => 'crypto_trading'],

            // Tech ETFs
            ['symbol' => 'BITO', 'name' => 'ProShares Bitcoin Strategy', 'value' => 32.84, 'change' => -0.50, 'chgPct' => -1.50, 'open' => 33.00, 'high' => 33.50, 'low' => 32.50, 'prev' => 33.34, 'color' => '#f7931a', 'category' => 'tech'],
             // Assuming MSFT, NFLX, META, GOOGL, PLTR are "Tech" here even if listed under general before. 
             // IMPORTANT: Since symbols must be unique, I will NOT duplicate them if resolved in general. 
             // Instead, I'll update their category or add variants if needed. But for this specific "Tech ETF" section, 
             // the user wants them here. I will change their category to 'tech' in the "Generic" section or add new symbols if unique.
             // Best approach: I'll overwrite the 'general' ones to 'tech' for these specific big tech co's if they are in the list.
             
             // Wait, stock symbols are unique. I should check my previous list passed to `stocks` array.
             // It had MSFT, META, GOOGL, NFLX as 'general'. I will update them to 'tech' in the array definition below 
             // BUT simpler is just to update the 'general' block. I'll rewrite the whole array slightly or use `updateOrCreate` to just ensure they have the new category.
             // Actually, I am redefining the WHOLE array in `run`. 
        ];

        // Let's add the new ones to the array directly. 
        // I will merge this correctly.
        
        $newStocks = [
            ['symbol' => 'BITO', 'name' => 'ProShares Bitcoin Strategy', 'value' => 32.84, 'change' => -0.50, 'chgPct' => -1.50, 'category' => 'tech', 'color' => '#f7931a'],
            ['symbol' => 'PLTR', 'name' => 'Palantir Technologies Inc.', 'value' => 17.55, 'change' => 1.20, 'chgPct' => 7.34, 'category' => 'tech', 'color' => '#101113'],
            
            // Automotive ETFs
            ['symbol' => 'CAT', 'name' => 'Caterpillar Inc.', 'value' => 321.73, 'change' => -4.68, 'chgPct' => -1.43, 'category' => 'automotive', 'color' => '#ffcd11'],
            ['symbol' => 'DAL', 'name' => 'Delta Air Lines, Inc.', 'value' => 45.64, 'change' => -0.48, 'chgPct' => -1.04, 'category' => 'automotive', 'color' => '#003a70'],
            ['symbol' => 'F', 'name' => 'Ford Motor Company', 'value' => 11.65, 'change' => -0.06, 'chgPct' => -0.51, 'category' => 'automotive', 'color' => '#003478'],
            ['symbol' => 'MBG.DE', 'name' => 'Mercedes-Benz Group AG', 'value' => 63.99, 'change' => -1.13, 'chgPct' => -1.74, 'category' => 'automotive', 'color' => '#8e8e8e'],
             // 5th one?
            ['symbol' => 'TM', 'name' => 'Toyota Motor Corp', 'value' => 185.00, 'change' => -2.00, 'chgPct' => -1.07, 'category' => 'automotive', 'color' => '#eb0a1e'],

            // Agriculture ETFs
            ['symbol' => 'MOO', 'name' => 'VanEck Agribusiness ETF', 'value' => 74.50, 'change' => 0.50, 'chgPct' => 0.68, 'category' => 'agriculture', 'color' => '#2e7d32'],
            ['symbol' => 'DBA', 'name' => 'Invesco DB Agriculture', 'value' => 20.80, 'change' => 0.10, 'chgPct' => 0.48, 'category' => 'agriculture', 'color' => '#4caf50'],
            ['symbol' => 'CORN', 'name' => 'Teucrium Corn Fund', 'value' => 22.15, 'change' => -0.05, 'chgPct' => -0.22, 'category' => 'agriculture', 'color' => '#fbc02d'],
            ['symbol' => 'WEAT', 'name' => 'Teucrium Wheat Fund', 'value' => 5.60, 'change' => 0.02, 'chgPct' => 0.36, 'category' => 'agriculture', 'color' => '#d4e157'],
            ['symbol' => 'DE', 'name' => 'Deere & Company', 'value' => 380.00, 'change' => 5.20, 'chgPct' => 1.39, 'category' => 'agriculture', 'color' => '#367c2b'],
        ];

        // I'll update existing logic to handle these defaults.
        // For simplicity, I'll assume updating the existing file logic is better.
        // But since I can't strictly modify the array in place easily with replace_content over non-contiguous blocks without being messy,
        // I will append these to the $stocks array in a way that respects the current structure.
        // Or I can add a second loop.
        
        foreach ($newStocks as $stock) {
             // Defaults for missing fields
             $stock['open'] = $stock['value'];
             $stock['high'] = $stock['value'] * 1.05;
             $stock['low'] = $stock['value'] * 0.95;
             $stock['prev'] = $stock['value'];
             Stock::updateOrCreate(['symbol' => $stock['symbol']], $stock);
        }

        // Add Forex and Crypto Assets
        $marketAssets = [
            // Forex
            ['symbol' => 'EURUSD', 'name' => 'EUR/USD', 'value' => 1.08, 'change' => 0.05, 'chgPct' => 0.04, 'category' => 'forex', 'color' => '#003399'],
            ['symbol' => 'GBPUSD', 'name' => 'GBP/USD', 'value' => 1.26, 'change' => -0.10, 'chgPct' => -0.08, 'category' => 'forex', 'color' => '#c8102e'],
            ['symbol' => 'USDJPY', 'name' => 'USD/JPY', 'value' => 148.50, 'change' => 0.30, 'chgPct' => 0.20, 'category' => 'forex', 'color' => '#bc002d'],
            ['symbol' => 'USDCHF', 'name' => 'USD/CHF', 'value' => 0.88, 'change' => -0.02, 'chgPct' => -0.02, 'category' => 'forex', 'color' => '#d52b1e'],
            ['symbol' => 'AUDUSD', 'name' => 'AUD/USD', 'value' => 0.65, 'change' => 0.15, 'chgPct' => 0.23, 'category' => 'forex', 'color' => '#00008b'],
            
            // Crypto
            ['symbol' => 'BTC', 'name' => 'Bitcoin', 'value' => 64500.00, 'change' => 1200.00, 'chgPct' => 1.89, 'category' => 'crypto', 'color' => '#f7931a'],
            ['symbol' => 'ETH', 'name' => 'Ethereum', 'value' => 3450.00, 'change' => 85.00, 'chgPct' => 2.52, 'category' => 'crypto', 'color' => '#627eea'],
            ['symbol' => 'SOL', 'name' => 'Solana', 'value' => 148.00, 'change' => 5.20, 'chgPct' => 3.64, 'category' => 'crypto', 'color' => '#00ffa3'],
            ['symbol' => 'BNB', 'name' => 'Binance Coin', 'value' => 590.00, 'change' => 10.00, 'chgPct' => 1.72, 'category' => 'crypto', 'color' => '#f3ba2f'],
            ['symbol' => 'XRP', 'name' => 'Ripple', 'value' => 0.62, 'change' => 0.01, 'chgPct' => 1.63, 'category' => 'crypto', 'color' => '#23292f'],
        ];

        foreach ($marketAssets as $asset) {
             $asset['open'] = $asset['value'];
             $asset['high'] = $asset['value'] * 1.05;
             $asset['low'] = $asset['value'] * 0.95;
             $asset['prev'] = $asset['value'];
             Stock::updateOrCreate(['symbol' => $asset['symbol']], $asset);
        }

        // Updating Categories for existing stocks that should be 'tech'
        Stock::whereIn('symbol', ['MSFT', 'NFLX', 'META', 'GOOGL', 'NVDA', 'AMD', 'AAPL', 'AMZN'])->update(['category' => 'tech']);

        foreach ($stocks as $stock) {
            Stock::updateOrCreate(['symbol' => $stock['symbol']], $stock);
        }
    }
}
