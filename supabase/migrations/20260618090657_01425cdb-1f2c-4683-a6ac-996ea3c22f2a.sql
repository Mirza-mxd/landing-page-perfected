
ALTER TABLE public.leads
  ADD COLUMN booked_call BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN booked_call_at TIMESTAMPTZ;

CREATE OR REPLACE FUNCTION public.mark_lead_booked(_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.leads
  SET booked_call = true,
      booked_call_at = now()
  WHERE email = _email
    AND id = (
      SELECT id FROM public.leads
      WHERE email = _email
      ORDER BY created_at DESC
      LIMIT 1
    );
END;
$$;

GRANT EXECUTE ON FUNCTION public.mark_lead_booked(TEXT) TO anon, authenticated;
