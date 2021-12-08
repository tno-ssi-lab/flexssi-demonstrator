import { useEffect, useState } from 'react';
import { createSSIClient, ResponseStatus } from 'util/SSIClient';

/**
 * Check if we got JWT token from eassi callback
 */
export function useSsiResponse() {
  const client = createSSIClient();

  const [ssiData, setSsiData] = useState({
    success: false,
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    const token = new URL(document.location.toString()).searchParams.get(
      'token'
    );
    if (!token) return;

    const response = client.parseVerifyResponse(token);

    if (response.status == ResponseStatus.success) {
      setSsiData({ ...ssiData, ...response.data, success: true });
    }
  }, [ssiData]);

  return ssiData;
}
