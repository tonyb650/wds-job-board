import { Badge } from "@/components/ui/badge";
import daysLeft from "@/utils/daysLeft";
import publishedStatus, { PublishedStatus } from "../helpers/publishedStatus";

type PublicationStatusBadgeProps = {
  expiresAt: Date | undefined;
};

const PublicationStatusBadge = ({
  expiresAt,
}: PublicationStatusBadgeProps): JSX.Element => {
  const status = publishedStatus(expiresAt);

  const badges: { [k in PublishedStatus]: JSX.Element } = {
    unpublished: (
      <Badge variant={"secondary"} className="rounded">
        Draft
      </Badge>
    ),
    active: (
      <Badge variant={"default"} className="rounded">
        Active - {daysLeft(expiresAt)}
      </Badge>
    ),
    expired: (
      <Badge variant={"destructive"} className="rounded">
        Expired
      </Badge>
    ),
  };

  return badges[status];
};

export default PublicationStatusBadge;
