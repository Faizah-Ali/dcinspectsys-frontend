import { getInspectionApprovers } from "../../select-approver/services/inspection-approvers.action";
import type { ForwardUser } from "../type";

export const getForwardApprovers = async (
  signal?: AbortSignal
): Promise<ForwardUser[]> => {
  const approvers = await getInspectionApprovers(signal);

  return approvers.map(
    ({ id, fullname }) =>
      ({
        id,
        name: fullname,
      }) satisfies ForwardUser
  );
};
