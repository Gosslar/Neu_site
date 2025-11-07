-- Add payment method and payment status columns to orders table
ALTER TABLE public.orders_2025_11_07_14_31 
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(20) DEFAULT 'card',
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'completed',
ADD COLUMN IF NOT EXISTS customer_info JSONB;

-- Update existing orders to have default payment method
UPDATE public.orders_2025_11_07_14_31 
SET payment_method = 'card', payment_status = 'completed'
WHERE payment_method IS NULL;

-- Add comment to explain payment methods
COMMENT ON COLUMN public.orders_2025_11_07_14_31.payment_method IS 'Payment method: card, cash';
COMMENT ON COLUMN public.orders_2025_11_07_14_31.payment_status IS 'Payment status: pending, completed, failed';
COMMENT ON COLUMN public.orders_2025_11_07_14_31.customer_info IS 'Customer information as JSON (name, email, phone, address)';

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_orders_payment_method ON public.orders_2025_11_07_14_31(payment_method);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders_2025_11_07_14_31(payment_status);