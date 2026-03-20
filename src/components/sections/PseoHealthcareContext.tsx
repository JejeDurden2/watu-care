import { CheckCircle, Building2, Hospital, Stethoscope, HeartPulse, Users } from 'lucide-react';
import { Container } from '@/components/ui';

interface PseoHealthcareContextProps {
  healthcareTitle: string;
  healthcareContext: string;
  highlightsTitle?: string;
  highlights?: string[];
  facilitiesTitle?: string;
  facilitiesSubtitle?: string;
  facilities?: string[];
}

const FACILITY_ICONS = [Hospital, Stethoscope, HeartPulse, Users] as const;

export function PseoHealthcareContext({
  healthcareTitle,
  healthcareContext,
  highlightsTitle,
  highlights,
  facilitiesTitle,
  facilitiesSubtitle,
  facilities,
}: PseoHealthcareContextProps): React.ReactElement {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 h-px w-16 bg-accent" />
            <h2 className="font-display text-3xl font-bold tracking-tighter text-secondary">
              {healthcareTitle}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              {healthcareContext}
            </p>

            {highlights && highlights.length > 0 && highlightsTitle && (
              <div className="mt-8">
                <h3 className="mb-4 font-semibold text-secondary">
                  {highlightsTitle}
                </h3>
                <ul className="space-y-3">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-foreground/80">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {facilities && facilities.length > 0 && facilitiesTitle && (
            <div className="self-start">
              <div className="mb-1 flex items-center gap-3">
                <Building2 className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-semibold tracking-tight text-secondary">
                  {facilitiesTitle}
                </h3>
              </div>
              {facilitiesSubtitle && (
                <p className="mb-6 text-sm text-muted-foreground">
                  {facilitiesSubtitle}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4">
                {facilities.map((facility, index) => {
                  const FacilityIcon = FACILITY_ICONS[index % FACILITY_ICONS.length];
                  return (
                    <div
                      key={facility}
                      className="rounded-xl border border-border bg-white p-5"
                    >
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/8">
                        <FacilityIcon className="h-4.5 w-4.5 text-primary" strokeWidth={1.5} />
                      </div>
                      <p className="text-sm font-medium leading-snug text-secondary">
                        {facility}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
