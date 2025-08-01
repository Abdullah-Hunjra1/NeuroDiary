import VoiceAssistant from '../components/VoiceAssistant';

export default function VoicePage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-primary mb-4">Welcome to NeuroDiary</h1>
      <VoiceAssistant />
    </div>
  );
}
